using System.ComponentModel.DataAnnotations.Schema;

namespace API.Models
{
    public class Book
    {
        public int Id { get; set; }
        [Column(TypeName = "VARCHAR(250)")]
        public string Title { get; set; }
        [Column(TypeName = "VARCHAR(250)")]
		public string Author { get; set; }
    }
}