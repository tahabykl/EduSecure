# EduSecure
EduSecure is a Chrome extension developed as part of my TUBITAK project with the same title.

## Installation

To install the extension, follow these steps:
1. Clone this repository to your local machine.
1. Open Chrome and go to chrome://extensions.
1. Turn on "Developer mode" by toggling the switch in the top right corner.
1. Click "Load unpacked" and select the folder where you cloned the repository.
1. The extension should now be installed and visible in your toolbar.

## Usage

Once the extension is installed, you can use the following features:

### Generate Password

On the "Vault" tab, you can generate a new password by selecting the desired length and character types (lowercase, uppercase, numeric, and/or special characters) and clicking the "Generate" button. The generated password will be displayed in the input field.

For a specific master password and domain, the generator will create the exact same password. Thus, there is no login or get password functionalities. The password generator acts both as a generator and a password vault.

This approach also makes the extension rather secure and efficient since it is a local password manager.

### Check for Malicious Websites

The extension checks the current website against a list of known malicious websites. If the website is flagged as malicious, a warning message will be displayed.

### Report a Website

If you encounter a malicious website that is not in the list, you can report it by clicking the "Report Site" button on the "This Website" tab. You will be prompted to confirm the report before it is sent.

### Change Color Scheme

On the "Settings" tab, you can select a color scheme for the extension from a list of options. The color scheme will be applied to the extension immediately.

### Contributing

If you'd like to contribute to the project, feel free to submit a pull request. Please make sure your code follows the existing style and is well-documented.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
