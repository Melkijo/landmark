// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LandCertificateStorage {
    struct LandCertificate {
        string owner;
        string location;
        string description;
        string thumbnail;
        string ownerId;
    }

    mapping(address => LandCertificate) public landCertificates;

    event LandCertificateStored(address indexed owner, string location, string description, string thumbnail, string ownerId);

    function storeLandCertificate(string memory _owner, string memory _location, string memory _description, string memory _thumbnail, string memory _ownerId) public {
        LandCertificate storage certificate = landCertificates[msg.sender];
        certificate.owner = _owner;
        certificate.location = _location;
        certificate.description = _description;
        certificate.thumbnail = _thumbnail;
        certificate.ownerId = _ownerId;


        emit LandCertificateStored(msg.sender, _location, _description, _thumbnail, _ownerId);
    }

    function getLandCertificate() public view returns (string memory, string memory, string memory) {
        LandCertificate storage certificate = landCertificates[msg.sender];
        return (certificate.owner, certificate.location, certificate.description);
    }
}