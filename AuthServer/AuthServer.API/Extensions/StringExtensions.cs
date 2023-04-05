using System.Globalization;
using System.Text;
using System.Text.RegularExpressions;

namespace AuthServer.API.Extensions;

public static class StringExtensions
{
    public static string RemoveAccents(this string text)
    {
        //check string just have spaces or null
        if (String.IsNullOrWhiteSpace(text))
        {
            return text;
        }
        // normalize that text
        text = text.Normalize(NormalizationForm.FormD);

        // remove all special character
        char[] chars = text.Where(c => CharUnicodeInfo.GetUnicodeCategory(c)
            != UnicodeCategory.NonSpacingMark).ToArray();

        // return new string
        return new string(chars).Normalize(NormalizationForm.FormC);
    }

    public static string Slugify(this string text)
    {
        //remove accent
        string nonAccentText = text.RemoveAccents().ToLower();

        //remove all special character from this string
        string result = Regex.Replace(nonAccentText, @"[^A-Za-z0-9\s-]", "");

        //remove all addition spaces in favour of just one
        result = Regex.Replace(result, @"\s+", " ").Trim();

        //remove all spaces with the hyphen
        result = Regex.Replace(result, @"\s", "-");

        return result;
    }
}