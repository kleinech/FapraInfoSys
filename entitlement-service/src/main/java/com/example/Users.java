package com.example;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.annotation.security.RolesAllowed;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.Attributes;
import javax.naming.directory.BasicAttributes;
import javax.naming.directory.DirContext;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.LdapName;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.DefaultValue;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

import com.example.data.GroupImpl;
import com.example.data.UserImpl;

/**
 * Root resource (exposed at "users" path)
 */
@Path("users")
@XmlAccessorType(XmlAccessType.FIELD)
public class Users {
	LdapSession session;
	public Users() throws NamingException {
		this.session = new LdapSession();
	}
	
    /**
     * Method handling HTTP GET requests. The returned object will be sent
     * to the client as "text/plain" media type.
     *
     * @return String that will be returned as a text/plain response.
     */
    @GET
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response list(@DefaultValue("100") @QueryParam("limit") int limit, @QueryParam("filter") @DefaultValue("") String filter) throws NamingException {
    	List<UserImpl> users = new ArrayList<UserImpl>();
    	
    	try {
    		if (filter.length() == 0) {
    			filter = Config.getUserFilter();
    		} else {
    			filter = "(&(" + Config.getUserFilter() + ")(" + filter + "))";
    		}
    		NamingEnumeration<SearchResult> ne = session.search(Config.getUserBaseDN(), filter, null, 100);
        	while (ne.hasMore()) {
        		SearchResult sr = ne.next();
        		Attributes attrs = sr.getAttributes();
            	users.add(new UserImpl(sr.getNameInNamespace(), (String)attrs.get(Config.getUserLoginAttr()).get(), (String)attrs.get(Config.getUserDisplayAttr()).get()));
        	}
        	return Response.ok().entity(users).header("Access-Control-Allow-Origin", "*").build();
    	} catch (NamingException ex) {
    		System.err.println(ex);
    		throw ex;
    	}
    	
    }
    
    @GET
    @Path("{id}")
    public UserImpl getUser(@PathParam("id") String id) throws NamingException {
    	boolean isDN = false;
    	if (id.contains("=")) {
    		try {
    			new LdapName(id);
    			isDN = true;
    		} catch (NamingException ex) {
    		}
    	}
    	UserImpl user = null;
    	if (isDN) {
    		Attributes attrs = session.ctx.getAttributes(id);
			user = new UserImpl(id, (String)attrs.get(Config.getUserLoginAttr()).get(), (String)attrs.get(Config.getUserDisplayAttr()).get());
    	} else {
    		NamingEnumeration<SearchResult> ne = session.search(Config.getUserBaseDN(), "(&(" + Config.getUserFilter() + ")(" + Config.getUserLoginAttr() + "={0}))", new Object[] { id }, 2);
    		if (ne.hasMore()) {
    			SearchResult sr = ne.next();
    			Attributes attrs = sr.getAttributes();
    			user = new UserImpl(sr.getNameInNamespace(), (String)attrs.get(Config.getUserLoginAttr()).get(), (String)attrs.get(Config.getUserDisplayAttr()).get());
    			ne.close();
    		} else {
    			//TODO
    		}
    	}
    	return user;
    	//return Response.ok().entity(user).build();
    }

    @GET
    @Path("{id}/groups")
    public List<GroupImpl> getUserGroups(@PathParam("id") String id, @DefaultValue("false") @QueryParam("recursive") boolean recursive) throws NamingException {
    	// TODO alternative strategy when server supports recursive lookup
    	Set<LdapName> names = new HashSet<LdapName>();
    	List<LdapName> queue = new LinkedList<LdapName>();
    	List<GroupImpl> result = new ArrayList<GroupImpl>();
    	queue.add(new LdapName(getUser(id).getDistinguishedName()));
    	while (! queue.isEmpty()) {
    		LdapName name = queue.remove(0);
    		NamingEnumeration<SearchResult> ne = session.search(Config.getGroupBaseDN(), "(&(" + Config.getGroupFilter() + ")(" + Config.getGroupMemberAttr() + "={0}))", new Object[] { name }, 100);
    		while (ne.hasMore()) {
    			SearchResult sr = ne.next();
    			Attributes attrs = sr.getAttributes();
    			GroupImpl g = new GroupImpl(sr.getNameInNamespace(), (String)attrs.get(Config.getGroupDisplayAttr()).get());
    			result.add(g);
    			
    			if (recursive) {
    				LdapName groupName = new LdapName(sr.getNameInNamespace());
    				if (! names.contains(groupName)) {
    					names.add(groupName);
    					queue.add(groupName);
    				}
    			}
    		}
    	}
    	return result;
    }
    
    @PUT
    @Path("{id}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public String createUser(@PathParam("id") String id, @FormParam("name") String name, @FormParam("password") String password) throws NamingException {
    	Attributes attrs = new BasicAttributes();
    	attrs.put("objectClass", Config.getUserClass());
    	attrs.put(Config.getUserLoginAttr(), id);
    	attrs.put(Config.getUserDisplayAttr(), name);
    	attrs.put(Config.getUserPasswordAttr(), password);
    	DirContext newCtx = session.ctx.createSubcontext(Config.getUserRDNAttr() + "=" + id + "," + Config.getUserBaseDN(), attrs);
    	return newCtx.getNameInNamespace();
    }
    
    private String getDNforID(String id) throws NamingException {
    	if (id.contains("=")) {
    		try {
    			new LdapName(id);
    			return id;
    		} catch (NamingException ex) {
    		}
    	}
		NamingEnumeration<SearchResult> ne = session.search(Config.getUserBaseDN(), "(&(" + Config.getUserFilter() + ")(" + Config.getUserLoginAttr() + "={0}))", new Object[] { id }, 2);
		try {
			if (ne.hasMore()) {
				SearchResult sr = ne.next();
				return sr.getNameInNamespace();
			} else {
				return null;
			}
		} finally {
			ne.close();
    	}
    }
    
    @DELETE
    @Path("{id}")
    public void deleteUser(@PathParam("id") String id) throws NamingException {
    	String dn = getDNforID(id);
    	session.ctx.destroySubcontext(dn);
    }
}
