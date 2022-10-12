
def create_classes_site(db):
    class Sites(db.Model):
        __tablename__ = 'Sites'
        __table_args__ = {'extend_existing': True}
        site_no = db.Column(db.String(20), primary_key=True)
        CBSA_Name = db.Column(db.String(100))
        Latitude = db.Column(db.Float)
        Longitude = db.Column(db.Float)
        Elevation = db.Column(db.String(50))
        Land_Use = db.Column(db.String(50))
        Location_Setting = db.Column(db.String(50))
        City_Name = db.Column(db.String(50))

        def __repr__(self):
            return '<Sites %r>' % (self.CBSA_Name)
    return Sites

def create_classes_county(db):
    class County(db.Model):
        __tablename__ = 'County'
        __table_args__ = {'extend_existing': True}
        county_code = db.Column(db.String(20), primary_key=True)
        county_name = db.Column(db.String(50))

        def __repr__(self):
            return '<County %r>' % (self.county_name)
    return County

def create_classes_pop(db):
    class CensusPopulation(db.Model):
        __tablename__ = 'CensusPopulation'
        __table_args__ = {'extend_existing': True}
        census_unique_no = db.Column(db.Integer, primary_key=True)
        county_code = db.Column(db.String(20))
        year = db.Column(db.String(20))
        population = db.Column(db.Integer)
        print(population)
        def __repr__(self):
            return '<Population %r>' % (self.census_unique_no)
    return CensusPopulation

def create_classes_year(db):
    class year(db.Model):
        __tablename__ = 'year'
        __table_args__ = {'extend_existing': True}
        year = db.Column(db.String(20), primary_key=True)

        def __repr__(self):
            return '<year %r>' % (self.year)
    return year

def create_classes_dateyear(db):
    class DateYear(db.Model):
        __tablename__ = 'DateYear'
        __table_args__ = {'extend_existing': True}
        Date = db.Column(db.Date, primary_key=True)
        year = db.Column(db.String(20))

        def __repr__(self):
            return '<DateYear %r>' % (self.Date)
    return DateYear

def create_classes_def_param(db):
    class Defining_Parameter(db.Model):
        __tablename__ = 'Defining_Parameter'
        __table_args__ = {'extend_existing': True}
        Defining_Parameter = db.Column(db.String(20), primary_key=True)

        def __repr__(self):
            return '<Defining_Parameter %r>' % (self.county_name)
    return Defining_Parameter

def create_classes_aq(db):
    class AirQuality(db.Model):
        __tablename__ = 'AirQuality'
        aq_unique_no = db.Column(db.Integer, primary_key=True)
        county_code = db.Column(db.String(50))
        Date = db.Column(db.String(20))
        Defining_Parameter = db.Column(db.String(20))
        Category = db.Column(db.String(50))
        State_Name = db.Column(db.String(20))
        AQI = db.Column(db.Integer)
        site_no = db.Column(db.String(20))

        def __repr__(self):
            return '<AirQuality %r>' % (self.county_code)
    return AirQuality



    
