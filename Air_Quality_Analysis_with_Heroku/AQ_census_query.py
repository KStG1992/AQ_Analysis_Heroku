import json
from flask import (
    Flask,
    render_template_string,
    render_template,
    jsonify,
    request,
    redirect)

from flask import current_app
from app import app
from flask_sqlalchemy import SQLAlchemy
from models import *

db = SQLAlchemy(app)

Sites = create_classes_site(db)
County = create_classes_county(db)
CensusPopulation = create_classes_pop(db)
year = create_classes_year(db)
DateYear = create_classes_dateyear(db)
Defining_Parameter = create_classes_def_param(db)
AirQuality = create_classes_aq(db)

# def get_SQL_Historical_AQI_query():
#     results = db.session.query(Sites.City_Name, Sites.Location_Setting,\
#         Sites.Land_Use, Sites.Elevation, County.county_name, ).all()

def get_SQL_AQ_census_query():
    # AQ_cenus_query = db.session.query(AirQuality)\
    #     .join(Sites, AirQuality.site_no == Sites.site_no).all()
        # .join(County, AirQuality.county_code == County.county_code)
    
    site_results = db.session.query(Sites.site_no, Sites.CBSA_Name,\
        Sites.Latitude,Sites.Longitude, Sites.Elevation,\
        Sites.Land_Use, Sites.Location_Setting, Sites.City_Name).all()
    
    aq_results = db.session.query(AirQuality.site_no, AirQuality.county_code, AirQuality.Date,\
        AirQuality.Defining_Parameter, AirQuality.Category, AirQuality.AQI, \
        ).all()
    
    # aq_sites_merge_df = aq_results.merge(sites_results,on='site_no')

    AQ_census_query = json.dumps([ row._asdict() for row in aq_results])
    # print(AQ_cenus_query)
    return AQ_census_query

get_SQL_AQ_census_query()