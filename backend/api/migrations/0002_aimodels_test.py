# Generated by Django 5.1.3 on 2024-11-11 21:30

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="AImodels",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, verbose_name="Name")),
                (
                    "path",
                    models.FilePathField(
                        max_length=200,
                        path="/Ihr/Pfad/hier/",
                        recursive=True,
                        verbose_name="Pfad",
                    ),
                ),
                (
                    "description",
                    models.TextField(blank=True, verbose_name="Beschreibung"),
                ),
            ],
            options={
                "verbose_name": "AI-Modell",
                "verbose_name_plural": "AI-Modelle",
            },
        ),
        migrations.CreateModel(
            name="Test",
            fields=[
                ("id", models.AutoField(primary_key=True, serialize=False)),
                ("name", models.CharField(max_length=100)),
                ("value", models.IntegerField()),
            ],
            options={
                "db_table": "test",
                "managed": True,
            },
        ),
    ]
