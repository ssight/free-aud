// <before>
void UpdateManager::GetUpdates()
{
    const audacity::network_manager::Request request("https://updates.audacityteam.org/feed/latest.xml");
    auto response = audacity::network_manager::NetworkManager::GetInstance().doGet(request);

    response->setRequestFinishedCallback([response, this](audacity::network_manager::IResponse*) {

        if (response->getError() != audacity::network_manager::NetworkError::NoError)
        {
            wxTheApp->CallAfter([] {ShowExceptionDialog(nullptr,
                XC("Error checking for update", "update dialog"),
                XC("Unable to connect to Audacity update server.", "update dialog"),
                wxString());
                });

            return;
        }

        if (!mUpdateDataParser.Parse(response->readAll<VersionPatch::UpdateDataFormat>(), &mVersionPatch))
        {
            wxTheApp->CallAfter([] {ShowExceptionDialog(nullptr,
                XC("Error checking for update", "update dialog"),
                XC("Update data was corrupted.", "update dialog"),
                wxString());
                });

            return;
        }

        if (mVersionPatch.version > CurrentBuildVersion())
        {
            wxTheApp->CallAfter([this] {
                UpdatePopupDialog dlg(nullptr, mVersionPatch);
                const int code = dlg.ShowModal();

                if (code == wxID_YES)
                {
                    if (!wxLaunchDefaultBrowser(mVersionPatch.download))
                    {
                        ShowExceptionDialog(nullptr,
                            XC("Error downloading update.", "update dialog"),
                            XC("Can't open the Audacity download link.", "update dialog"),
                            wxString());
                    }
                }
                });
        }
        });
}

// <after>
void UpdateManager::GetUpdates()
{
    const audacity::network_manager::Request request("");
    auto response = audacity::network_manager::NetworkManager::GetInstance().doGet(request);

    response->setRequestFinishedCallback([response, this](audacity::network_manager::IResponse*) {

        if (response->getError() != audacity::network_manager::NetworkError::NoError)
        {
            wxTheApp->CallAfter([] {ShowExceptionDialog(nullptr,
                XC("Error checking for update", "update dialog"),
                XC("FreeAud disables automatic update detection in order to protect your privacy.", "update dialog"),
                wxString());
                });

            return;
        }

        if (!mUpdateDataParser.Parse(response->readAll<VersionPatch::UpdateDataFormat>(), &mVersionPatch))
        {
            wxTheApp->CallAfter([] {ShowExceptionDialog(nullptr,
                XC("Error checking for update", "update dialog"),
                XC("FreeAud disables automatic update detection in order to protect your privacy..", "update dialog"),
                wxString());
                });

            return;
        }

        if (mVersionPatch.version > CurrentBuildVersion())
        {
            wxTheApp->CallAfter([this] {
                UpdatePopupDialog dlg(nullptr, mVersionPatch);
                const int code = dlg.ShowModal();

                if (code == wxID_YES)
                {
                    if (!wxLaunchDefaultBrowser(mVersionPatch.download))
                    {
                        ShowExceptionDialog(nullptr,
                            XC("Error downloading update.", "update dialog"),
                            XC("FreeAud disables automatic update detection in order to protect your privacy.", "update dialog"),
                            wxString());
                    }
                }
                });
        }
        });
}