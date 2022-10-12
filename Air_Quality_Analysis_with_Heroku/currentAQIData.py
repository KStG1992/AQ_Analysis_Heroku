import csv
import requests
import pandas as pd 


# create function to pull csv into json for javascript map
def get_csv():
    data_file = open("static/Data/currentAQIData.csv")
    r = pd.read_csv(data_file)

    currentAQI_json = r.to_json(orient ='table')

    return currentAQI_json
    
get_csv()   


# alt method not used
    # currentAQIData = list(r.values)

    # currentAQI_json = {'data': []}

    # for row in currentAQIData:
    #     currentAQI_json['data'].append({
    #         'CurrentAQIValue': row[14],
    #         'Latitude': row[2],
    #         'Logitute': row[3],
    #         'CurrentPollutant': row[15]
    #     })
    # print(currentAQI_json)

