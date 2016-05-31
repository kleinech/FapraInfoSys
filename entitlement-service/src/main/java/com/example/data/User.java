package com.example.data;

public interface User extends Principal {
	public String getLoginName();
	public void setLoginName(String name);
	public boolean checkPassword(String password);
	public void setPassword(String password);
}
