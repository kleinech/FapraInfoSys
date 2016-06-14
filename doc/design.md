# Goals
* Overall goal is to create an ECM portal for companies that do not
  want to host their data with one of the big providers.
* IBM's commercial portal can be used as a model for orientation
* All the components should be developed using only free open source
  licences
* The specific goals of this work group include:
  * set up a web application and create design that can easily be
	extended whenever more functionality is to be added
  * Specifically focus on the design and implementation of security
	aspects, namely the AAA (Authentication, Authorization, Access
	Control)
  * this aspect of the portal must offer functions to manage users,
	groups and roles.
* The design must be appealing as it is presented to the user for
  direct iteration
* The design and implementation must be easy to understand and easy to
  operate in order to deliver a pleasant user experience. This is one
  of the important reasons why customers choose one provider over
  another.

# Architecture
* Our specific aspect of the application is divided into three parts.
* First, there is the front-end which must be a browser/web
  application so that the user can access it easily.
* The back-end of the user/group management is an LDAP server. Groups
  and Roles are both stored as groups.
* In between there is a Java library which communicates with the LDAP
  server and provides a REST interface against which the front-end can
  issue requests.

# Frontend
* We decided to implement the front-end using Angular2. It allows for a
  modern design and modern user experience. It offers many predesigned
  means to display and input data as well as easy communication with
  the REST interface of the middle layer.

# Middle Layer
* The middle layer is a given Java library which (mostly for testing
  purposes) runs as a standalone Java application. It can however be
  easily integrated as a Java EE container and run as managed
  application on a Java Application Server.

# Design Decisions
## Add User/Group dialog
**Requirement**: Adding single users is a basic requirement for the
account management. The application must offer means to enter user data
in a comfortable way, send them to the back-end and receive a reply
about success or possibly any detected problems right away.

**Implementation**: the user dialog is implemented as a modal dialog
that pops up if the user presses the "add" button. That way no page load
is necessary (faster response) and the form fields are still clearly
separated from the rest of the page. The request data is sent via a REST
call to the Java middle layer, which also provides an appropriate
response about the success of the action.

## Data update dialog
## Paged and sorted list of search results
**Requirement**: If many users are to be managed by the system,
loading all entries at once can pose an unnecessary load to the server
and will cause high bandwidth usage. Likely, the user is only
interested in one or a few entries at a time. Displaying all entries
at once will also slow down the user and require to search manually.
Thus, the user interface must provide functionality to search for
entries. Because search results can still be long lists, the results
must be displayed in chunks of variable size.

**Implementation**: the user interface provides a search bar. The
input to this bar is forwarded as a search request to the Java library
which in turn forwards the request to the LDAP-Server. In order to
provide paged search results, the front-end can also specify a starting
position and a number. So the first page can be retrieved by sending a
search request with the search term, 0 (start position) and 10
(request 10 entries. The second page can be requested by sending 10 as
start position and so on.

This design is simple yet effective, neither the Java middle layer nor
the LDAP server need to keep any state. The current cursor position
remains completely on the client (browser) which keeps the server
complexity low. The design is more scalable because the Java
middleware could easily be hosted several times. It does not matter to
which of the instances the requests are sent. The design can easily be
extended to support prefetching of the next page's entries. This may
improve the user experience further by eliminating UI delays.
