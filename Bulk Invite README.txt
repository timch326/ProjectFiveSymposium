================Prepare CSV File=========================
Prepare a CSV file with the users you want to invite. These points should be considered while preparing CSV file:
One user per line.
Email is required in the first column, and the email must be valid.
The role of a user need to be filled in second column. Currently there are 3 user roles, student,teacher and Mentor.
Any permissions groups you want this user to be a member of should be in third column. For multiple groups, separate group names with a semicolon group_1;group_2;group_3
Normally invited users arrive at the homepage. If you would rather invited users end up on a specific topic, enter that Topic ID in the third column.

The format is:

name@example.com,user_role,group_1;group_2,topic_id

Note that group names and topic id are completely optional, only email and user role is mandatory. You can have an invite that is just the email and user role:

name@example.com,user_role

It's easy to create CSV files in a spreadsheet, which would look like this:

Examples of student:

jeff@gmail.com,student,group1,100
sam@yahoo.com,teacher,,8800
neil@yahoo.com,mentor,,

 

