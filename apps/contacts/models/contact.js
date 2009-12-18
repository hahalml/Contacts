// ==========================================================================
// Project:   Contacts.Contact
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals Contacts */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
Contacts.Contact = SC.Record.extend(
/** @scope Contacts.Contact.prototype */ {
	firstName: SC.Record.attr(String),
	lastName: SC.Record.attr(String),
	
	// full name
	fullName: function()
	{
		var val = (this.get("firstName") || "") + " " + (this.get("lastName") || "");
		
		if (val.trim() === "") val = this.get("company") || "";

		return val;
	}.property('firstName', 'lastName', 'company').cacheable(),
	
	// it is a company? Yes no.
	company: SC.Record.attr(String),
	
	address: SC.Record.attr(String),
	city: SC.Record.attr(String),
	state: SC.Record.attr(String),
	zip: SC.Record.attr(String),
	
	phone: SC.Record.attr(String),
	email: SC.Record.attr(String),
	
	groups: SC.Record.toMany("Contacts.Group", {
		inverse: "contacts", isMaster: NO
	}),
	
	searchRelevance: 0, // a property that others may use
	searchFullName: "", // has things like <strong>The</strong> Search Term.
	
	pendingGroups: [],
	storeDidChangeProperties: function() {
	  if (this.get("guid")) {
	    if (this.get("pendingGroups") && this.get("pendingGroups").get("length") > 0) {
	      this.get("pendingGroups").forEach(function(item){
	        item.get("contacts").pushObject(this);
	      }, this);
	      this.set("pendingGroups", []);
	      Contacts.store.commitRecords();
	    }
	  }
	}
}) ;
