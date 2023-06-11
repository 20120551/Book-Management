using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderServer.Infrastructure.Write.Migrations
{
    /// <inheritdoc />
    public partial class Update_Movie_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_movie_order_OrderId",
                schema: "order_server",
                table: "movie");

            migrationBuilder.DropForeignKey(
                name: "FK_order_receiver__receiverId",
                schema: "order_server",
                table: "order");

            migrationBuilder.DropForeignKey(
                name: "FK_order_user_UserId",
                schema: "order_server",
                table: "order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_movie",
                schema: "order_server",
                table: "movie");

            migrationBuilder.AlterColumn<Guid>(
                name: "_receiverId",
                schema: "order_server",
                table: "order",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "order_server",
                table: "order",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderId",
                schema: "order_server",
                table: "movie",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_movie",
                schema: "order_server",
                table: "movie",
                columns: new[] { "Id", "OrderId" });

            migrationBuilder.AddForeignKey(
                name: "FK_movie_order_OrderId",
                schema: "order_server",
                table: "movie",
                column: "OrderId",
                principalSchema: "order_server",
                principalTable: "order",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_receiver__receiverId",
                schema: "order_server",
                table: "order",
                column: "_receiverId",
                principalSchema: "order_server",
                principalTable: "receiver",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_order_user_UserId",
                schema: "order_server",
                table: "order",
                column: "UserId",
                principalSchema: "order_server",
                principalTable: "user",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_movie_order_OrderId",
                schema: "order_server",
                table: "movie");

            migrationBuilder.DropForeignKey(
                name: "FK_order_receiver__receiverId",
                schema: "order_server",
                table: "order");

            migrationBuilder.DropForeignKey(
                name: "FK_order_user_UserId",
                schema: "order_server",
                table: "order");

            migrationBuilder.DropPrimaryKey(
                name: "PK_movie",
                schema: "order_server",
                table: "movie");

            migrationBuilder.AlterColumn<Guid>(
                name: "_receiverId",
                schema: "order_server",
                table: "order",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Status",
                schema: "order_server",
                table: "order",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<Guid>(
                name: "OrderId",
                schema: "order_server",
                table: "movie",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddPrimaryKey(
                name: "PK_movie",
                schema: "order_server",
                table: "movie",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_movie_order_OrderId",
                schema: "order_server",
                table: "movie",
                column: "OrderId",
                principalSchema: "order_server",
                principalTable: "order",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_order_receiver__receiverId",
                schema: "order_server",
                table: "order",
                column: "_receiverId",
                principalSchema: "order_server",
                principalTable: "receiver",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_order_user_UserId",
                schema: "order_server",
                table: "order",
                column: "UserId",
                principalSchema: "order_server",
                principalTable: "user",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
