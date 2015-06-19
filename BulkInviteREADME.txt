To set up the user and groups system on Discourse, please read the following and follow the steps to configure the access rights.

In the Discourse system, there are three types of objects that are important to understading the access right configurations:

1.  Users
2.  Categories
3.  Groups


There are four types of user roles:
  1.  Student
  2.  Mentor
  3.  Teacher
  4.  Admin

By default we have four groups:
  1.  Everyone
  2.  Mentors
  3.  Teachers
  4.  Admins
Admin users need to create custom groups for each module.

Categories should be created by the Admin user to represent each module. 
  - Users post topics in the Category pertaining to the module they are working on.
  - There are three types of capabilities for a user in a Category:
      a.  Create - able to post new topics in the category
      b.  Reply - able to reply to topics in the category
      c.  See - able to read the the topics and posts in the Category
    Together, they form three levels of permissions for a Category:
      a.  Create/Reply/See
      b.  Reply/See
      c.  See

Group - User:
  Groups contain zero or many users.

  When a user is invited to Discourse, their user role can be set to one of Student, Mentor, or Teacher. If they are a Teacher or Mentor, they are automatically added to the Teacher and Mentor group, respectively. Students are invited to join specific groups based on the module they are assigned to. 

Categories - Groups:
  Categories can be configured to have different levels of accessibility for different Groups. 
  By default, for every Category created by the Admin, the following permissions are preconfigured:
    a.  Everyone (including students) can see ALL Categories, but cannot create new topics or post replies to topics
    b.  Teachers can create, reply to and see topics in ALL Categories
    c.  Mentors can reply to and see topics in ALL Categories
  For students who are currently working on a module, the Admin grants them Create/Reply/See capabilities to the correspoding Category by configuring the permissions.

Here are the steps to create Groups, invite Users and add them to the corresponding Categories with the correct permissions configured. 

A.  Access the Admin panel
    1.  Log in as the Admin user
    2.  Click on the menu (three bars) in the top-right corner of the page and select "Admin" option
    3.  Click on "Groups" in the horizontal tabs near the top of the page

B.  Create Groups
    1. In the "Groups" tab, choose the press the "+ New" button under "Edit Groups"
    2. Name the group (most probably corresponding to the module name or maybe the course year/term of the students in this group) and click "Save"

C.  Create Categories and Configure Permissions
    1.  On the home page of the Discourse forum, enter "Categories" by selecting "Categories" in the horizotnal tab menu near the to of the page
    2.  Click on "+ New Category" 
    3.  The following are the required configurations (you may optionally configure the colours, etc.)
    4.  Name the category, corresponding to the modules
    5.  Click the "Security" tab. By default you will see the following permissions configured:
      a.  Everyone can... See
      b.  Teachers can... Create/Reply/See
      c.  Mentors can...  Reply/See
    6.  Click "Edit Permissions" button
    7.  By default, students are only able to See topics in a Category (they fall into the "Everyone" Group. To enable a student Group to start posting in their module's Category, from the first dropdown select the student Group name, and in the second dropdown, select Create/Reply/See

To Invite Users to Discourse

Users who are invited to Discourse 

A. Prepare the CSV File
  1.  Prepare a CSV file with the users you want to invite. 
  2.  These points should be considered while preparing CSV file:
        a.  One user per line.
        b.  Email is required in the first column, and the email must be valid.
        c.  The role of a user need to be filled in second column. Currently there are 3 user roles, student,teacher and Mentor.
        d.  Any permissions groups you want this user to be a member of should be in third column. For multiple groups, separate group names with a semicolon group_1;group_2;group_3
        e.  Normally invited users arrive at the homepage. If you would rather invited users end up on a specific topic, enter that Topic ID in the third column.

  3.  In summmary, the format is:
      name@example.com,user_role,group_1;group_2,topic_id

  4.  Note that group names and topic id are completely optional, only email and user role is mandatory. You can have an invite that is just the email and user role:
  name@example.com,user_role

  Examples:

  jeff@gmail.com,student,group1,100
  sam@yahoo.com,teacher,,8800
  neil@yahoo.com,mentor,,

 B. Invite Users
    1.  Log in as the Admin user
    2.  Click on the menu (three bars) in the top-right corner of the page and select "Admin" option
    3.  Click on "Users" in the horizontal tabs near the top of the page
    4.  Click "Send Invites" on the right side of the horizontal grey menu
    5.  On the Invites page, select "Bulk Invite from File"
    6.  A file uploader will appear. Navigate to the location of the prepared CSV file and click "Open"
    7.  The file will (hopefully!) succesfully upload and a notification will inform the Admin user that the invites have been sent.



