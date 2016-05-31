package com.example.data;

public class PrincipalImpl implements Principal {
	String distinguishedName;
	String displayName;

	public PrincipalImpl() {
	}
	
	public PrincipalImpl(String distinguishedName, String displayName) {
		this.distinguishedName = distinguishedName;
		this.displayName = displayName;
	}

	@Override
	public String getDistinguishedName() {
		return this.distinguishedName;
	}
	@Override
	public void setDistinguishedName(String name) {
		this.distinguishedName = name;
	}
	@Override
	public String getDisplayName() {
		return displayName;
	}
	@Override
	public void setDisplayName(String name) {
		this.displayName = name;
	}
}