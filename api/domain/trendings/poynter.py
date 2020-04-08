import os
from pathlib import Path, PurePath
from pandas import read_csv
import sys

from utils.config import IS_DEVELOPMENT
from utils.google.drive import find_file_from_name, \
                               get_file_media
from utils.pandas import create_rows_from_data_frame


GOOGLE_DRIVE_ID = os.environ.get('DATA_GOOGLE_DRIVE_ID')
GOOGLE_SERVICE_ACCOUNT_CREDENTIALS = os.environ.get("DATA_GOOGLE_SERVICE_ACCOUNT_CREDENTIALS") \
                                   .replace('\'', '')

DEVELOPMENT_POYNTER_CLAIMS_DIR = Path(os.path.dirname(os.path.realpath(__file__)))\
              / '..' / '..' / 'static' / 'poynter_claims.csv'


def load_data_frame():
    filepath_or_buffer = None
    if IS_DEVELOPMENT:
        if not os.path.exists(DEVELOPMENT_POYNTER_CLAIMS_DIR):
            file = open(DEVELOPMENT_POYNTER_CLAIMS_DIR, 'w')
            file.write('When did you see the claim?,Country 1,Country 2,Country 3,Country 4,Organization,What did you fact-check?,Who said/posted it?,Link to the original piece,URL to fact-checked article (in your language),Language of your fact-check,Final rating,Explanation\n')
            file.close()
        filepath_or_buffer = DEVELOPMENT_POYNTER_CLAIMS_DIR
    else:
        file = find_file_from_name(
            'poynter_claims.csv',
            drive_id=GOOGLE_DRIVE_ID,
            parent_folder_id=GOOGLE_DRIVE_ID,
            service_account_string=GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
        )
        filepath_or_buffer = get_file_media(
            file.get('id'),
            service_account_string=GOOGLE_SERVICE_ACCOUNT_CREDENTIALS
        )
    setattr(sys.modules[__name__], 'df', read_csv(filepath_or_buffer))


def claim_from_poynter(datum, index):
    return {
        'type': 'claim',
        'source': {
            'id': 'poynter-{}'.format(index)
        },
        'text': datum['What did you fact-check?']
    }


def find_poynter_trendings(
    days=1,
    max_trendings=3,
    min_shares=10000,
    theme=None,
):
    df = getattr(sys.modules[__name__], 'df')
    return [
        claim_from_poynter(row, index)
        for (index, row) in enumerate(create_rows_from_data_frame(df, index_keys='id'))
    ]


def poynter_trending_from(source_id):
    df = getattr(sys.modules[__name__], 'df')
    df_id = int(source_id.replace('poynter-', ''))
    poynter = df.loc[df_id]
    return claim_from_poynter(poynter, df_id)
