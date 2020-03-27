import requests

from utils.buzzsumo import get_content_with_buzzsumo_result, \
                           get_buzzsumo_url
from utils.config import IS_DEVELOPMENT


DEVELOPMENT_TRENDINGS = [{
    'buzzsumoId': 123,
    'externalThumbUrl': 'https://cdn.cnn.com/cnnnext/dam/assets/170708175538-05-trump-abroad-0708-super-tease.jpg',
    'facebookShares': 1000,
    'publishedDate': "Tue, 12 Mar 2019 01:02:00 GMT",
    'subdomain': 'www.cnn.com',
    'tags': 'climate',
    'title': "Donald Trump buried a climate change report because 'I don't believe it'",
    'totalShares': 10000,
    'twitterShares': 1000,
    'url': 'https://www.cnn.com/2018/11/26/politics/donald-trump-climate-change/index.html',
}, {
    'buzzsumoId': 1231,
    'externalThumbUrl': 'https://cdn.cnn.com/cnnnext/dam/assets/180804095014-03-file-climate-change-super-tease.jpg',
    'facebookShares': 178670,
    'publishedDate': "Wed, 13 Mar 2019 01:02:00 GMT",
    'subdomain': 'www.cnn.com',
    'tags': 'climate',
    'title': "Climate change will shrink US economy and kill thousands, government report warns",
    'totalShares': 354013,
    'twitterShares': 14228,
    'url': 'https://www.cnn.com/2018/11/23/health/climate-change-report-bn/index.html',
}, {
    'buzzsumoId': 1232,
    'externalThumbUrl': 'https://i.upworthy.com/nugget/5bff1e29b170e900100c4204/Marcario-091a0002863efe8fda745bafe6178f1c.jpg?ixlib=rails-2.1.3&w=1200&h=624',
    'facebookShares': 1423505,
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'subdomain': 'www.upworthy.com',
    'tags': 'climate',
    'title': "Patagonia’s CEO is donating company’s entire $10M Trump tax cut to fight climate change.",
    'totalShares': 1434478,
    'twitterShares': 9062,
    'url': 'https://www.upworthy.com/patagonia-s-ceo-is-donating-company-s-entire-10-m-trump-tax-cut-to-fight-climate-change',
}, {
    'buzzsumoId': 12321234,
    'facebookShares': 178670,
    'externalThumbUrl': 'https://www.motherjones.com/wp-content/uploads/2018/12/trump-g20-120118.jpeg?w=1200&h=630&crop=1',
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'subdomain': 'www.motherjones.com',
    'tags': 'climate',
    'title': "19 of 20 world leaders just pledged to fight climate change. Trump was the lone holdout.",
    'totalShares': 354013,
    'twitterShares': 14228,
    'url': 'https://www.motherjones.com/environment/2018/12/trump-g20-climate-paris-accord-denial/',
}, {
    'buzzsumoId': 12321235,
    'facebookShares': 178650,
    'externalThumbUrl': 'https://pbs.twimg.com/media/EFwWN1kWsAAt76T?format=jpg&name=small',
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'subdomain': 'www.motherjones.com',
    'tags': 'health',
    'title': "Trump signs $1.8 billion autism funding bill.",
    'totalShares': 354011,
    'twitterShares': 14248,
    'url': 'https://abcnews.go.com/Health/trump-signs-18-billion-autism-cares-act/story?id=66002425',
}, {
    'buzzsumoId': 121212,
    'facebookShares': 138650,
    'externalThumbUrl': 'https://pbs.twimg.com/media/EFwWN1kWsAAt76T?format=jpg&name=small',
    'publishedDate': "Mon, 11 Mar 2019 05:02:00 GMT",
    'subdomain': 'www.motherjones.com',
    'tags': 'health',
    'title': "Hacer ejercicio, la mejor arma para luchar contra la depresión.",
    'totalShares': 351011,
    'twitterShares': 13248,
    'url': 'https://www.menshealth.com/es/salud-bienestar/a26409675/depresion-ejercicio-ansiedad-prevenir/',
}]


def get_buzzsumo_trending(id):
    trending = None
    if IS_DEVELOPMENT:
        buzzsumo_id_number = int(id)
        kept_trendings = [
            trending for trending in DEVELOPMENT_TRENDINGS
            if trending['buzzsumoId'] == buzzsumo_id_number
        ]
        if len(kept_trendings) > 0:
            trending = kept_trendings[0]

    #
    # NEED TO WRITE THE PRODUCTIONBUZZSUMO GET API FROM ID
    #

    return trending


def get_topic_with_theme(theme):
    if theme == 'climate':
        return 'global warming,climate change,ocean acidification,sea level rise,carbon dioxide,CO2,greenhouse gases'
    elif theme =='health':
        return 'vaccine,vaccines,disease,diseases,health,healthy,virus,Natural Remedy,alternative medicine,homeopathy,anti-inflammatory,trans fat,trans fats,immune system,cardiovascular diseases,measles'
    return None


def find_buzzsumo_trendings(
    days=1,
    max_trendings=3,
    min_shares=10000,
    theme=None,
):

    config = {
        "count": max_trendings * 2,
        "search_type": "trending_now"
    }

    topic = get_topic_with_theme(theme)
    if topic:
        config["topic"] = topic
    if days:
        config["hours"] = int(days) * 24

    url = get_buzzsumo_url("trends", config)

    response = requests.get(url).json()
    trendings = []
    urls = set()

    trending_saved = 0

    if 'results' not in response:
        print('WARNING: EMPTY RESPONSE FROM BUZZSUMO ' + repr(response))
        if IS_DEVELOPMENT:
            return DEVELOPMENT_TRENDINGS
        else:
            return []

    for result in response['results']:
        if result['total_shares'] < min_shares:
            continue

        trending = get_content_with_buzzsumo_result(result)
        if theme:
            trending['theme'] = theme.title()

        if trending.get('url') in urls:
            print('WARNING, BUZZSUMO RETURNS SEVERAL TIMES THE SAME URL')
            continue

        if trending.get('url'):
            urls.add(url)

        trendings.append(trending)

        trending_saved += 1
        if trending_saved >= max_trendings:
            break

    return trendings
