from pathlib import Path
from typing import Dict, List

from objects.files import Files
from objects.metadata import Metadata

import objects.files

def replace_pattern(self):
    field = input("What field to search: ")
    find = input("What to search: ")
    replace = input("What to replace with: ")
    replace_field = input("What field to perform replacement: ")
    files_to_process = self.files.get_files()
    for file in files_to_process:
        self.cleaner.metadata.replace_pattern(file, field, find, replace, replace_field)