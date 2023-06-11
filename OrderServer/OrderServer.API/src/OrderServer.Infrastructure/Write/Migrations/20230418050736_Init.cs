using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderServer.Infrastructure.Write.Migrations
{
    /// <inheritdoc />
    public partial class Init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "order_server");

            migrationBuilder.CreateTable(
                name: "receiver",
                schema: "order_server",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_receiver", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "user",
                schema: "order_server",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Username = table.Column<string>(type: "text", nullable: false),
                    FistName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "order",
                schema: "order_server",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TotalPrice = table.Column<float>(type: "real", nullable: false),
                    _receiverId = table.Column<Guid>(type: "uuid", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    Status = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_order", x => x.Id);
                    table.ForeignKey(
                        name: "FK_order_receiver__receiverId",
                        column: x => x._receiverId,
                        principalSchema: "order_server",
                        principalTable: "receiver",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_order_user_UserId",
                        column: x => x.UserId,
                        principalSchema: "order_server",
                        principalTable: "user",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "movie",
                schema: "order_server",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<float>(type: "real", nullable: false),
                    Seat = table.Column<string>(type: "text", nullable: false),
                    Quantity = table.Column<int>(type: "integer", nullable: false),
                    OrderId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_movie", x => x.Id);
                    table.ForeignKey(
                        name: "FK_movie_order_OrderId",
                        column: x => x.OrderId,
                        principalSchema: "order_server",
                        principalTable: "order",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_movie_OrderId",
                schema: "order_server",
                table: "movie",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_order__receiverId",
                schema: "order_server",
                table: "order",
                column: "_receiverId");

            migrationBuilder.CreateIndex(
                name: "IX_order_UserId",
                schema: "order_server",
                table: "order",
                column: "UserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "movie",
                schema: "order_server");

            migrationBuilder.DropTable(
                name: "order",
                schema: "order_server");

            migrationBuilder.DropTable(
                name: "receiver",
                schema: "order_server");

            migrationBuilder.DropTable(
                name: "user",
                schema: "order_server");
        }
    }
}
