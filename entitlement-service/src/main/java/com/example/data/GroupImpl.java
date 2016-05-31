package com.example.data;

import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="group")
public class GroupImpl extends PrincipalImpl implements Group {
	public GroupImpl() {
	}
	public GroupImpl(String distinguishedName, String displayName) {
		super(distinguishedName, displayName);
	}

	@Override
	public List<Principal> getMembers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void addMember(Principal principal) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void removeMember(Principal principal) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isMember(Principal principal) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isMember(Principal principal, boolean recursive) {
		// TODO Auto-generated method stub
		return false;
	}
	
}