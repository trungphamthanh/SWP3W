using DASBackEnd.Data;
using DASBackEnd.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DASBackEnd.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SlotController : ControllerBase
    {
        private readonly DasContext _DasContext;
        public SlotController(DasContext DasContext)
        {

            this._DasContext = DasContext;

        }

        [HttpGet]
        [Route("GetAllSlotByDoctorId/{id}")]
        public async Task<ActionResult<IEnumerable<Slot>>> GetAllSlotByDoctorId(int id)
        {
            if (_DasContext.Slots == null)
            {
                return BadRequest(new { Message = "Can not get slots of doctor " });
            }
            var slots = await _DasContext.Slots.Where(x => x.AccountId == id).ToListAsync();
            if (slots == null)
            {
                return BadRequest(new { Message = "Doctor not exist " });
            }
            return Ok(slots);

        }

        [HttpGet]
        [Route("GetAllSlot")]
        public async Task<ActionResult<IEnumerable<Slot>>> GetAllSlot()
        {
            if (_DasContext == null)
            {
                return BadRequest(new { Message = "Can not get all slot information " });
            }
            else
            {
                return await _DasContext.Slots.ToListAsync();
            }

        }


        [HttpPost]
        [Route("AddDoctorToSlot")]
        public async Task<ActionResult<IEnumerable<Slot>>> AddDoctor(List<Slot> objSlot)
        {
            if (objSlot.Count > 6)
            {
                return BadRequest(new { Message = "Can not add more than 6 slot" });
            }
            foreach (var slot in objSlot)
            {
                await _DasContext.Slots.AddAsync(slot);
                await _DasContext.SaveChangesAsync();
            }
            return Ok();
        }

    }
}
