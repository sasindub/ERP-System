# ERP System
ERP System

This is an ERP system that allows you to manage customers and items. Additionally, it provides features to generate and download reports.

## Features

### Dashboard

The system provides a user-friendly dashboard from which you can access the customer area, item area, and report generating areas.

### Customer Management

In the customer management area, you can perform various actions, including:
- Adding a new customer by filling the required fields
- Updating existing customer information
- Deleting customers
- Searching for specific customers

### Item Management

The item management area allows you to:
- Add new items by providing necessary details
- Update item information
- Delete items
- Search for specific items

### Report Generation

The system offers a report generating area where you can:
- Search for reports
- Filter reports by date range
- Download the generated reports

## Assumptions

- The customer mobile number should be exactly 10 digits long.
- The minimum price for an item is Rs. 10.00.
- The minimum quantity that can be added for an item is 1.
- When filtering data with a date range, the system considers data between the start date and end date, inclusive.

## How to Set Up

1. Download the ERP-System file.
2. Place the downloaded file into the `htdocs` folder of your XAMPP installation directory (if you don't have XAMPP, please download and install it on your machine).
3. Start Apache and MySQL in XAMPP control panel.
4. Access PHPMyAdmin by navigating to `http://localhost/phpmyadmin/` and create a new database named "erp_system."
5. Import the `erp_system.sql.gz` file from the ERP-System folder into the "erp_system" database.
6. Open your web browser and access the Apache server (usually at `http://localhost/`).
7. Choose the "ERP-System" folder that you placed in the `htdocs` directory.
8. The ERP System should now be up and running. You will be redirected to the dashboard, which serves as the landing page.

## Notes

- Make sure to meet the assumptions related to customer mobile numbers, item prices, and quantity to avoid potential errors.
- For any technical issues or inquiries, please refer to the GitHub repository's issue section.
- This ERP system was developed and tested with XAMPP, so using it with other server configurations may require adjustments.
- Feel free to contribute to the development of this project by submitting pull requests. We appreciate your support and feedback!

System explanation video - `https://drive.google.com/drive/folders/1NoR9nZISLceVm3I-QiKQMKktDod-7Rey?usp=sharing`
