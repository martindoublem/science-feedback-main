from collections import OrderedDict
from sqlalchemy.orm.collections import InstrumentedList

from models.manager.relationships import Relationships
from models.utils.serialize import serialize
from utils.human_ids import dehumanize, humanize

class Asdict(Relationships):
    def asdict(self, **options):
        result = OrderedDict()
        for key in self.__mapper__.c.keys():

            if options\
               and 'includes' in options\
               and options.get('includes')\
               and "-"+key in options['includes']:
                continue

            value = getattr(self, key)

            if options and options.get('cut'):
                if isinstance(value, str):
                    if len(value) > options['cut']:
                        value = value[:options['cut']] + '...'

            if key == 'id' or self.is_relationship_item(key, value):
                result[key] = humanize(value)

            elif key == 'validationToken':
                continue

            elif key == 'firstThumbDominantColor' and value:
                result[key] = list(value)

            else:
                result[key] = serialize(value, **options)
        # add the model name
        result['modelName'] = self.__class__.__name__
        if options\
           and 'includes' in options\
           and options['includes']:
            for join in options['includes']:
                if isinstance(join, str) and\
                   join.startswith('-'):
                    continue
                elif isinstance(join, dict):
                    key = join['key']
                    refine = join.get('refine')
                    resolve = join.get('resolve')
                    includes = join.get('includes')
                else:
                    key = join
                    refine = None
                    resolve = None
                    includes = None
                try:
                    value = getattr(self, key)
                except AttributeError:
                    continue
                if callable(value):
                    value = value()
                if value is not None:
                    if isinstance(value, InstrumentedList)\
                       or value.__class__.__name__ == 'AppenderBaseQuery'\
                       or isinstance(value, list):
                        if refine is None:
                            final_value = value
                        else:
                            final_value = refine(value, options.get('filters', {}))

                        final_value = [x for x in final_value if not x.is_soft_deleted()]

                        result[key] = [
                            attr.asdict(
                                cut=options and options.get('cut'),
                                includes=includes
                            )
                            for attr in final_value
                        ]
                        if resolve != None:
                            result[key] = [
                                resolve(v, options.get('filters', {}))
                                for v in result[key]
                            ]
                    elif isinstance(value, Asdict):
                        result[key] = value.asdict(
                            includes=includes,
                            cut=options and options.get('cut'),
                        )
                        if resolve != None:
                            result[key] = resolve(
                                result[key],
                                options.get('filters', {})
                            )
                    else:
                        result[key] = serialize(value)

        if options and 'resolve' in options and options['resolve']:
            return options['resolve'](result, options.get('filters', {}))

        return result
