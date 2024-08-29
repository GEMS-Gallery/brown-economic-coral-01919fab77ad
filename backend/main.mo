import Array "mo:base/Array";
import Func "mo:base/Func";
import Hash "mo:base/Hash";

import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Debug "mo:base/Debug";

actor {
  // Define the TaxPayer type
  public type TaxPayer = {
    tid: Text;
    firstName: Text;
    lastName: Text;
    address: Text;
  };

  // Create a stable variable to store TaxPayer records
  private stable var taxPayersEntries : [(Text, TaxPayer)] = [];

  // Create a HashMap to store TaxPayer records
  private var taxPayers = HashMap.HashMap<Text, TaxPayer>(0, Text.equal, Text.hash);

  // Function to create a new TaxPayer record
  public func createTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async Result.Result<(), Text> {
    switch (taxPayers.get(tid)) {
      case (null) {
        let newTaxPayer : TaxPayer = {
          tid = tid;
          firstName = firstName;
          lastName = lastName;
          address = address;
        };
        taxPayers.put(tid, newTaxPayer);
        #ok(())
      };
      case (?_) {
        #err("TaxPayer with TID " # tid # " already exists")
      };
    }
  };

  // Function to get all TaxPayer records
  public query func getAllTaxPayers() : async [TaxPayer] {
    Iter.toArray(taxPayers.vals())
  };

  // Function to get a TaxPayer by TID
  public query func getTaxPayerByTID(tid: Text) : async ?TaxPayer {
    taxPayers.get(tid)
  };

  // Function to update a TaxPayer record
  public func updateTaxPayer(tid: Text, firstName: Text, lastName: Text, address: Text) : async Result.Result<(), Text> {
    switch (taxPayers.get(tid)) {
      case (null) {
        #err("TaxPayer with TID " # tid # " not found")
      };
      case (?_) {
        let updatedTaxPayer : TaxPayer = {
          tid = tid;
          firstName = firstName;
          lastName = lastName;
          address = address;
        };
        taxPayers.put(tid, updatedTaxPayer);
        #ok(())
      };
    }
  };

  // Preupgrade hook to save the state
  system func preupgrade() {
    taxPayersEntries := Iter.toArray(taxPayers.entries());
  };

  // Postupgrade hook to restore the state
  system func postupgrade() {
    taxPayers := HashMap.fromIter<Text, TaxPayer>(taxPayersEntries.vals(), 0, Text.equal, Text.hash);
    taxPayersEntries := [];
  };
}
