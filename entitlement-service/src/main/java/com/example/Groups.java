package com.example;

import java.util.ArrayList;
import java.util.List;

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
import javax.ws.rs.GET;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;

import com.example.data.GroupImpl;

/**
 * Root resource (exposed at "users" path)
 */
@Path("groups")
@XmlAccessorType(XmlAccessType.FIELD)
public class Groups {
	LdapSession session;
	public Groups() throws NamingException {
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
    public List<GroupImpl> list(@DefaultValue("100") @QueryParam("limit") int limit, @QueryParam("filter") @DefaultValue("") String filter) throws NamingException {
    	List<GroupImpl> groups = new ArrayList<GroupImpl>();
    	
    	try {
    		if (filter.length() == 0) {
    			filter = Config.getGroupFilter();
    		} else {
    			filter = "(&(" + Config.getGroupFilter() +")(" + filter + "))";
    		}
    		NamingEnumeration<SearchResult> ne = session.search(Config.getGroupBaseDN(), filter, null, 100);
        	while (ne.hasMore()) {
        		SearchResult sr = ne.next();
        		Attributes attrs = sr.getAttributes();
        		groups.add(new GroupImpl(sr.getNameInNamespace(), (String)attrs.get(Config.getGroupDisplayAttr()).get()));
        	}
        	return groups;
    	} catch (NamingException ex) {
    		System.err.println(ex);
    		throw ex;
    	}    	
    }
    
    @GET
    @Path("{id}")
    public GroupImpl getGroup(@PathParam("id") String id) throws NamingException {
    	boolean isDN = false;
    	if (id.contains("=")) {
    		try {
    			new LdapName(id);
    			isDN = true;
    		} catch (NamingException ex) {
    		}
    	}
    	GroupImpl group = null;
    	if (isDN) {
    		Attributes attrs = session.ctx.getAttributes(id);
			group = new GroupImpl(id, (String)attrs.get(Config.getGroupDisplayAttr()).get());
    	} else {
    		NamingEnumeration<SearchResult> ne = session.search(Config.getGroupBaseDN(), "(&(" + Config.getGroupFilter() + ")(" + Config.getGroupDisplayAttr() + "={0}))", new Object[] { id }, 2);
    		if (ne.hasMore()) {
    			SearchResult sr = ne.next();
    			Attributes attrs = sr.getAttributes();
    			group = new GroupImpl(sr.getNameInNamespace(), (String)attrs.get(Config.getGroupDisplayAttr()).get());
    			ne.close();
    		} else {
    			//TODO
    		}
    	}
    	return group;
    	//return Response.ok().entity(user).build();
    }

    @PUT
    @Path("{id}")
    @Consumes("application/x-www-form-urlencoded")
    public String createGroup(@PathParam("id") String id) throws NamingException {
    	Attributes attrs = new BasicAttributes();
    	attrs.put(Config.getGroupDisplayAttr(), id);
    	DirContext newCtx = session.ctx.createSubcontext(Config.getGroupRDNAttr() + "=" + id, attrs);
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
		NamingEnumeration<SearchResult> ne = session.search(Config.getUserBaseDN(), "(&(" + Config.getGroupFilter() + ")(" + Config.getGroupDisplayAttr() + "={0}))", new Object[] { id }, 2);
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
    public void deleteGroup(@PathParam("id") String id) throws NamingException {
    	String dn = getDNforID(id);
    	session.ctx.destroySubcontext(dn);
    }
}
