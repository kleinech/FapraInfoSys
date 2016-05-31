package com.example;

import static org.junit.Assert.*;

import java.util.List;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.MediaType;

import org.glassfish.grizzly.http.server.HttpServer;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.example.data.Group;
import com.example.data.GroupImpl;
import com.example.data.User;
import com.example.data.UserImpl;

public class MyResourceTest {

    private HttpServer server;
    private WebTarget target;

    @Before
    public void setUp() throws Exception {
        // start the server
        server = Main.startServer();
        // create the client
        Client c = ClientBuilder.newClient();

        // uncomment the following line if you want to enable
        // support for JSON in the client (you also have to uncomment
        // dependency on jersey-media-json module in pom.xml and Main.startServer())
        // --
        // c.configuration().enable(new org.glassfish.jersey.media.json.JsonJaxbFeature());

        target = c.target(Main.BASE_URI);
    }

    @After
    public void tearDown() throws Exception {
        server.stop();
    }

    /**
     * Test to see that the message "Got it!" is sent in the response.
     */
    @Test
    public void testGetIt() {
    	List list = target.path("users").request().accept(MediaType.APPLICATION_JSON).get(List.class);
    	assertNotNull(list);
    	assertTrue(! list.isEmpty());
    	
    	User user = target.path("users").path("sysadmin").request().accept(MediaType.APPLICATION_JSON).get(UserImpl.class);
    	assertNotNull(user);
    	assertEquals("cn=sysadmin,ou=users,ou=customer,o=sccm", user.getDistinguishedName());
    	assertEquals("sysadmin", user.getLoginName());
    	assertEquals("sysadmin", user.getDisplayName());

    	user = target.path("users").path("cn=sysadmin,ou=users,ou=customer,o=sccm").request().accept(MediaType.APPLICATION_JSON).get(UserImpl.class);
    	assertNotNull(user);
    	assertEquals("cn=sysadmin,ou=users,ou=customer,o=sccm", user.getDistinguishedName());
    	assertEquals("sysadmin", user.getLoginName());
    	assertEquals("sysadmin", user.getDisplayName());

    	list = target.path("groups").request().accept(MediaType.APPLICATION_JSON).get(List.class);
    	assertNotNull(list);
    	assertTrue(! list.isEmpty());

    	Group group = target.path("groups").path("scausers").request().accept(MediaType.APPLICATION_JSON).get(GroupImpl.class);
    	assertNotNull(group);
    	assertEquals("cn=scausers,ou=groups,ou=customer,o=sccm", group.getDistinguishedName());
    	assertEquals("scausers", group.getDisplayName());

    	Form form = new Form();
    	form.param("name", "Test User");
    	form.param("password", "passw0rd");
    	String s = target.path("users").path("testuser").request().accept(MediaType.APPLICATION_JSON).put(Entity.entity(form,MediaType.APPLICATION_FORM_URLENCODED),String.class);
    	assertEquals("sn=testuser,ou=users,ou=customer,o=SCCM", s);
    	user = target.path("users").path("testuser").request().accept(MediaType.APPLICATION_JSON).get(UserImpl.class);
    	assertEquals("sn=testuser,ou=users,ou=customer,o=SCCM", user.getDistinguishedName());
    	assertEquals("testuser", user.getLoginName());
    	assertEquals("Test User", user.getDisplayName());
    	System.out.println("DELETE:" + target.path("users").path("testuser").request().accept(MediaType.APPLICATION_JSON).delete());
    	user = target.path("users").path("testuser").request().accept(MediaType.APPLICATION_JSON).get(UserImpl.class);
    	assertNull(user);
    }
}
