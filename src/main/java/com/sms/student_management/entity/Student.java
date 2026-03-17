package com.sms.student_management.entity;

import jakarta.persistence.*;

@Entity
public class Student {

@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;

private String roll;
private String name;
private String gender;
private String branch;
private String mobile;
private String parent;

public Long getId() { return id; }

public void setId(Long id) { this.id = id; }

public String getRoll() { return roll; }

public void setRoll(String roll) { this.roll = roll; }

public String getName() { return name; }

public void setName(String name) { this.name = name; }

public String getGender() { return gender; }

public void setGender(String gender) { this.gender = gender; }

public String getBranch() { return branch; }

public void setBranch(String branch) { this.branch = branch; }

public String getMobile() { return mobile; }

public void setMobile(String mobile) { this.mobile = mobile; }

public String getParent() { return parent; }

public void setParent(String parent) { this.parent = parent; }

}
