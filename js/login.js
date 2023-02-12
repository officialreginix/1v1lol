var tempErrorCreds;
var tempProviderName;
function retrieveIdToken(successCallback, errorCallback) {
if(firebase.auth().currentUser === null){
if(errorCallback !== null)
errorCallback("User is null");
return;
}
firebase.auth().currentUser.getIdToken().then(function (idToken) {
	var resultObj = {
		token: idToken,
		displayName: firebase.auth().currentUser.displayName
	};

	if (successCallback !== undefined) {

		successCallback(resultObj);
	}
})
	.catch(function (error) {
		console.log(error);
		if (errorCallback !== undefined)
			errorCallback(error.message);
	});

}
function anonymousLogin(successCallback, errorCallback) {
var resultObj = {
token: "",
displayName: "guest"
};
if (successCallback !== undefined) {

	successCallback(resultObj);
}

}
function firebaseLogin(providerName, successCallback, errorCallback) {
if (providerName === "anonymous") {
anonymousLogin(successCallback, errorCallback);
return;
}
var user = firebase.auth().currentUser;

if(user != null && !user.isAnonymous){
	retrieveIdToken(successCallback, errorCallback);
	return;
}

// log in as a guest user by default
firebase.auth().signInAnonymously().then(function (userCredential) {
	retrieveIdToken(successCallback, errorCallback);
});

}
function firebaseLogout() {
firebase.auth().signOut().catch(function (error) {
console.log(error);
});
}
function getCurrentUserDisplayName() {
var user = firebase.auth().currentUser;
var displayName = "";
if (user) {
displayName = user.displayName;
}
return displayName;
}
function getProvider(providerName) {
if (providerName && providerName.indexOf("facebook") != -1)
return new firebase.auth.FacebookAuthProvider()
else
return new firebase.auth.GoogleAuthProvider()
}
function setModalContent(modalContentId, contentString) {
content = document.getElementById(modalContentId);
if (content) {
content.innerHTML = contentString;
}
}

