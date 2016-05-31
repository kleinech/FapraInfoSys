package com.example.data;

import java.util.List;

public interface Role {
	public String getName();
	public List<Principal> getOwners();
	public boolean hasRole(Principal principal);
	public void addOwner(Principal principal);
	public void removeOwner(Principal principal);
}
