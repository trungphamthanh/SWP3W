using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Repositories;
using System.ComponentModel.DataAnnotations;

namespace BookingWebs.Pages
{
    public class LoginModel : PageModel
    {
        public readonly IAccountRepository _accountRepository;
        public LoginModel(IAccountRepository accountRepository)
        {
            _accountRepository = accountRepository;
        }
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }
        [Required]
        [Display(Name = "Password")]
        [DataType(DataType.Password)]
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
                ViewData["Title"] = "Login failed";
                return Page();
            }
            else
            {
                return RedirectToPage("/Bookings/Index");
            }
            return Page();
        }
    }
}
