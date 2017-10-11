using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace NCSAngular.Migrations
{
    public partial class Added_ADProvinsiTableView : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.CreateTable(
            //    name: "ADProvinsiTableView",
            //    columns: table => new
            //    {
            //        Id = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
            //        ADNegaraId = table.Column<long>(type: "bigint", nullable: false),
            //        CreationTime = table.Column<DateTime>(type: "datetime2", nullable: false),
            //        CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
            //        DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
            //        DeletionTime = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        IsDeleted = table.Column<bool>(type: "bit", nullable: false),
            //        LastModificationTime = table.Column<DateTime>(type: "datetime2", nullable: true),
            //        LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
            //        Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        NegaraName = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        userCreate = table.Column<string>(type: "nvarchar(max)", nullable: true),
            //        userEdit = table.Column<string>(type: "nvarchar(max)", nullable: true)
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PK_ADProvinsiTableView", x => x.Id);
            //    });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            //migrationBuilder.DropTable(
            //    name: "ADProvinsiTableView");
        }
    }
}
