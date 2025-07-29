using System.ComponentModel.DataAnnotations;

namespace Apex_IT.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}