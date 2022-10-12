import csv
import pandas as pd
import json

def pull_cvp_csv():
    file = "static/Data/countyvpop.csv"

    cvp = pd.read_csv(file)

    print(cvp)

    cvp_json = cvp.to_json(orient="records")

    print(cvp_json)   

    return cvp_json

pull_cvp_csv() 