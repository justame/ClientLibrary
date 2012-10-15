using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Configuration;

namespace ClientLibrary.Handle
{
    public class clsGlobal
    {
        public static string RelativePath = String.Empty;

        public static void Init()
        {
            RelativePath = ConfigurationManager.AppSettings.Get("RelativePath");
        }
    }
}