// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SecSafe {
    struct VaultEntry {
        string siteName;
        string encryptedUsername;
        string encryptedPassword;
    }

    mapping(address => VaultEntry[]) private userVault;

    event EntryAdded(address indexed user, string siteName);
    event EntryUpdated(address indexed user, uint index, string siteName);
    event EntryDeleted(address indexed user, uint index);

    // Add a new encrypted entry
    function addEntry(string calldata siteName, string calldata encryptedUsername, string calldata encryptedPassword) external {
        VaultEntry memory newEntry = VaultEntry({
            siteName: siteName,
            encryptedUsername: encryptedUsername,
            encryptedPassword: encryptedPassword
        });

        userVault[msg.sender].push(newEntry);
        emit EntryAdded(msg.sender, siteName);
    }

    // Get all entries for the user
    function getMyEntries() external view returns (VaultEntry[] memory) {
        return userVault[msg.sender];
    }

    // Update an entry by index
    function updateEntry(uint index, string calldata siteName, string calldata encryptedUsername, string calldata encryptedPassword) external {
        require(index < userVault[msg.sender].length, "Invalid index");

        VaultEntry storage entry = userVault[msg.sender][index];
        entry.siteName = siteName;
        entry.encryptedUsername = encryptedUsername;
        entry.encryptedPassword = encryptedPassword;

        emit EntryUpdated(msg.sender, index, siteName);
    }

    // Delete an entry by index
    function deleteEntry(uint index) external {
        require(index < userVault[msg.sender].length, "Invalid index");

        uint lastIndex = userVault[msg.sender].length - 1;

        if (index != lastIndex) {
            userVault[msg.sender][index] = userVault[msg.sender][lastIndex];
        }

        userVault[msg.sender].pop();
        emit EntryDeleted(msg.sender, index);
    }
}
