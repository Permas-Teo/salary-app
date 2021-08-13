# Filter out comments from dataframe
def filterDf(df):
    return df[~df['id'].str.contains("#")] 

# "id and login must be unique. They cannot be repeated in another row" 
# => Assume invalid if ANY id or login is found duplicate in csv
def validateCSV(df):
    noDuplicatesId = {}
    noDuplicatesLogin = {}
    for index, row in df.iterrows():
        currId = row["id"]
        currLogin = row["login"]
        
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