import csv
from datetime import datetime

class DataManager:



    def get_date(self):
            return datetime.today().strftime(r'%m/%d/%Y')



    def __init__(self, fpath):
        self.fpath = fpath
        self.person_dictionary = self.read_file()



    def read_file(self):
        try:
            with open(self.fpath, "r") as f:
                person_dictionary = {}
                file_reader = csv.reader(f, delimiter=",")
                for line in file_reader:
                    person_dictionary[line[0]] = line[1:]
            
            return person_dictionary
        except:
            return {}



    def write_file(self):
        with open(self.fpath, "w") as f:
            file_writer = csv.writer(f, delimiter=",")

            for person in sorted(self.person_dictionary.keys()):
                file_writer.writerow([person] + self.person_dictionary[person])



    def create_new_person(self, person_data: dict):
        self.person_dictionary[person_data["name"]] = [person_data["phone_number"], person_data["email"]]
        self.check_in_person(person_data)

        pass



    def check_in_person(self, person_name: dict):
        if self.get_date() not in self.person_dictionary[person_name["name"]]:
            self.person_dictionary[person_name["name"]].append(self.get_date())
            self.write_file()



    def get_list_of_names(self):
        return sorted(self.person_dictionary.keys())