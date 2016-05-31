package com.example;

public class Config {
	public static String getUserBaseDN() { return "ou=users,ou=customer,o=SCCM"; };
	public static String getUserFilter() { return "objectClass=person"; };
	public static String getUserDisplayAttr() { return "cn"; };
	public static String getUserLoginAttr() { return "sn"; };
	public static String getUserPasswordAttr() { return "userPassword"; };
	public static String getUserRDNAttr() {  return "sn"; };
	public static String getUserClass() { return "inetOrgPerson"; };
	
	public static String getGroupBaseDN() { return "ou=groups,ou=customer,o=SCCM"; };
	public static String getGroupFilter() { return "objectClass=groupOfNames"; };
	public static String getGroupDisplayAttr() { return "cn"; };
	public static String getGroupMemberAttr() { return "member"; };
	public static String getGroupRDNAttr() {  return "cn"; };
	public static String getGroupClass() { return "groupOfNames"; };
}
