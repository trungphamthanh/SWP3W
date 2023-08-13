using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using BusinessObj.Models;
using Repository;
using System.ComponentModel.DataAnnotations;

namespace BookingWebs.Pages.BookingInfor
{
    public class IndexModel : PageModel
    {
        private readonly BusinessObj.Models.DASContext _context;
        public readonly IBookingRepository _repository;
        public IndexModel(BusinessObj.Models.DASContext context, IBookingRepository bookingRepository)
        {
            _context = context;
            _repository = bookingRepository;
        }

        public IList<Booking> Booking { get; set; } = default!;
        [Display(Name = "Customer name")]
        public string CustomerName { get; set; } = "";
        public IActionResult OnGetAsync(string customerName)
        {
            if (string.IsNullOrEmpty(customerName))
            {
                Booking = _context.Bookings
                .ToList();
            }
            else
            {
                Booking = _repository.GetBookingsByCustomerName(customerName).ToList();
            }
            return Page();
        }
    }
}
