# Goals
* Overall goal is to create an ECM portal for companies that do not
  want to host their data with one of the big providers.
* IBM's commercial portal can be used as a model for orientation
* All the components should be developed using only free open source
  licences
* The specific goals of this work group include:
  * set up a web application and create design that can easily be
	extended whenever more functionality is to be added
  * Specificly focus on the design and implementation of security
	aspects, namely the AAA (Authentication, Authorization, Access
	Control)
  * this aspect of the portal must offer functions to manage users,
	groups and roles.
* The design must be appealing as it is presented to the user for
  direct interation
* The design and implementation must be easy to understand and easy to
  operate in order to deliver a pleasent user experience. This is one
  of the important reasons why customers choose one provider over
  another.

# Architecture
* Our specific aspect of the application is divided into three parts.
* First, there is the frontend which must be a browser/web application
  so that the user can access it easily.
* the backend of the user/group management is an LDAP server. Groups
  and Roles are both stored as groups.
* In between there is a java library which communicates with the LDAP
  server and provides a REST interface against which the frontend can
  issue requests.

# Frontend
* We decided to implement the frontend using Angular2. It allows for a
  modern design and modern user experience. It offers many predesigned
  means to display and input data as well as easy communication with
  the REST interface of the middle layer.
