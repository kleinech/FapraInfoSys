package com.example.data;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="user")
public class UserImpl extends PrincipalImpl implements User {
	String loginName;
	
	public UserImpl(String distinguishedName, String loginName, String displayName) {
		super(distinguishedName, displayName);
		this.loginName = loginName;
	}
	
	public UserImpl() {
	}

	@Override
	public String getLoginName() {
		return this.loginName;
	}

	@Override
	public void setLoginName(String name) {
		this.loginName = name;
	}

	@Override
	public boolean checkPassword(String password) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public void setPassword(String password) {
		// TODO Auto-generated method stub
		
	}
}