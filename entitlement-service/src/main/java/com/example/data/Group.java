package com.example.data;

import java.util.List;

public interface Group extends Principal {
	public List<Principal> getMembers();
	public void addMember(Principal principal);
	public void removeMember(Principal principal);
	public boolean isMember(Principal principal);
	public boolean isMember(Principal principal, boolean recursive);
}
