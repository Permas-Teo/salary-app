# Filter out comments from dataframe
def filterDf(df):
    df.iloc[:, 0] = df.iloc[:, 0].astype(str)
    df.iloc[:, 1] = df.iloc[:, 1].astype(str)
    df.iloc[:, 2] = df.iloc[:, 2].astype(str)
    return df[~df.iloc[:, 0].str.contains("#")] 

# "id and login must be unique. They cannot be repeated in another row" 
# => Assume invalid if ANY id or login is found duplicate in csv
def validateCSV(df):
    noDuplicatesId = {}
    noDuplicatesLogin = {}
    for index, row in df.iterrows():
        currId = row.iloc[0]
        currLogin = row.iloc[1]
        
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
