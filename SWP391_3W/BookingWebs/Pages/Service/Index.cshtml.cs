using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.EntityFrameworkCore;
using BusinessObj.Models;
using Repositories;
using System.ComponentModel.DataAnnotations;

namespace BookingWebs.Pages.Service
{
    public class IndexModel : PageModel
    {
        private readonly BusinessObj.Models.DASContext _context;
        public readonly IServiceRepository _repository;
        public IndexModel(BusinessObj.Models.DASContext context, IServiceRepository serviceRepository)
        {
            _context = context;
            _repository = serviceRepository;
        }

        public IList<Daservice> Daservice { get; set; } = default!;
        [Display(Name = "Service name")]
        public string ServiceName { get; set; } = "";
        public IActionResult OnGetAsync(string serviceName)
        {
            if (string.IsNullOrEmpty(serviceName))
            {
                Daservice = _context.Daservices
                .ToList();
            }
            else
            {
                Daservice = _repository.FindServiceByName(serviceName).ToList();
            }
            return Page();
        }
    }
}
