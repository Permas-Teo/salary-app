import pandas as pd


# Utility
def filterDf(df):
    return df[~df['id'].str.contains("#")] 

# id and login must be unique. They cannot be repeated in another row 
# => Assume invalid if ANY id or login is found duplicate in csv
def validateCSV(df):
    noDuplicatesId = {}
    noDuplicatesLogin = {}
    print(df)
    for index, row in df.iterrows():
        currId = row["id"]
        currLogin = row["login"]

        # Check all values not NAN
        # if (pd.isna(currId) or pd.isna(currLogin) or pd.isna(currName) or pd.isna(currSalary)):
        #     return False

        # Check salary is numeric and >= 0
        # if type(currSalary) == int or type(currSalary) == float:
        #     if currSalary < 0:
        #         return False
        # else:
        #     return False
        
        # Check duplicates for id
        if currId not in noDuplicatesId:
            noDuplicatesId[currId] = True
        else:
            return "Duplicate id detected in csv file"
        
        # Check duplicates for login
        if currLogin not in noDuplicatesLogin:
            noDuplicatesLogin[currLogin] = True
        else:
            return "Duplicate login detected in csv file"

    return False