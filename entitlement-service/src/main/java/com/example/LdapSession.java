package com.example;

import java.util.Hashtable;

import javax.naming.Context;
import javax.naming.NameClassPair;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;
import javax.naming.ldap.Control;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

public class LdapSession {
	LdapContext ctx;
	
	@SuppressWarnings({"rawtypes", "unchecked"})
	public LdapSession() throws NamingException {
		Hashtable env = new Hashtable();
		env.put(Context.INITIAL_CONTEXT_FACTORY, 
		    "com.sun.jndi.ldap.LdapCtxFactory");
		env.put(Context.PROVIDER_URL, "ldap://129.69.209.114:389"); // 192.168.209.190:389

		// Authenticate as S. User and password "mysecret"
		env.put(Context.SECURITY_AUTHENTICATION, "simple");
		env.put(Context.SECURITY_PRINCIPAL, "cn=bindusr, o=SCCM");
		env.put(Context.SECURITY_CREDENTIALS, "passw0rd");

		// Create the initial context
		ctx = new InitialLdapContext(env, new Control[0]);
	}

	public NamingEnumeration<SearchResult> search(String base, String filter, Object[] filterArgs, int limit) throws NamingException {
		NamingEnumeration<SearchResult> res = this.ctx.search(base, filter, filterArgs, new SearchControls(SearchControls.SUBTREE_SCOPE, limit, 1000, null, false, false));
		return res;
	}
		
	public static void main(String args[]) throws Exception {
		LdapSession me = new LdapSession();
		
		NamingEnumeration<NameClassPair> ncps = me.ctx.list("ou=customer");
		while (ncps.hasMore()) {
			NameClassPair nc = ncps.next();
			System.out.println(nc);
		}
		
		NamingEnumeration<SearchResult> res = me.ctx.search("", "objectClass=person", null, new SearchControls(SearchControls.SUBTREE_SCOPE, 100, 1000, null, false, false));
		while (res.hasMore()) {
			SearchResult r=res.next();
			System.out.println("- " + r.getName());
		}
	}
}
