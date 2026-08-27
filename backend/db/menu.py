import sys


class Menu:
    """Print/Runs dictionary of descriptions/functions.

    Args:
        title (str): Title of the menu.
        menu_data (dict): Correspondence of option/function it runs.

    Returns:
        bool:
            False if "0" is chosen. Breaks out of menu loop.
            Void otherwise
    """

    def __init__(self, title: str, menu_data: dict) -> None:
        while True:
            print(f"\n=== {title} ===")
            for key, item in menu_data.items():
                print(f"{key}. {item['label']}")
            print("0. 󰿅  Exit")

            choice = input("Select an option: ").strip()

            if choice == "0":
                sys.exit(0)
            if choice in menu_data:
                menu_data[choice]["action"]()
            else:
                print("Invalid option. Please try again.")
