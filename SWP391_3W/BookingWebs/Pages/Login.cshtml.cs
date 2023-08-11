using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Repository;
using System.ComponentModel.DataAnnotations;

namespace BookingWebs.Pages
{
    public class LoginModel : PageModel
    {
        protected readonly IAccountRepository _accountRepository;
        public LoginModel(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Username")]
        public string Username { get; set; }
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }
        public void OnGet()
        {
        }
        public IActionResult OnPostAsync(string username, string password)
        {
            if (!ModelState.IsValid)
            {
                return Page();
            }
            var account = _accountRepository.GetAccount(username, password);
            if (account == null)
            {
                ViewData["Title"] = "You do not have permission to do this function";
                return Page();
            }
            return RedirectToPage("/BookingInfor/Index");
        }
    }
}
