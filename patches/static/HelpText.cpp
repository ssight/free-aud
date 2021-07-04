// <before>
// Url with Version check args attached.
const URLString VerCheckUrl()
{
   //The version we intend to use for live Audacity.
#define VER_CHECK_URL "https://www.audacityteam.org/download/?"
//For testing of our scriptlet.
//#define VER_CHECK_URL "http://www.audacityteam.org/slug/?"
//For testing locally
//#define VER_CHECK_URL "http://localhost:63342/WorkingDocs/demos/download.html?"

   return wxString( wxT(VER_CHECK_URL)) +VerCheckArgs();
}

// <after>
// Url with Version check args attached.
const URLString VerCheckUrl()
{
   //The version we intend to use for live Audacity.
#define VER_CHECK_URL "0.0.0.0"
//For testing of our scriptlet.
//#define VER_CHECK_URL "http://www.audacityteam.org/slug/?"
//For testing locally
//#define VER_CHECK_URL "http://localhost:63342/WorkingDocs/demos/download.html?"

   return wxString( wxT(VER_CHECK_URL)) +VerCheckArgs();
}