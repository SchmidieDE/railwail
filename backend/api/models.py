from django.db import models
from django.contrib.auth.models import User


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title


class Test(models.Model):
    # Replace these fields with the actual columns of your 'test' table
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    value = models.IntegerField()

    class Meta:
        managed = True  # Django won't try to create or alter this table
        db_table = 'test'  # Name of the table in the database
        
        
class AImodels(models.Model):
    name = models.CharField("Name", max_length=100)
    path = models.FilePathField("Pfad", path="/Ihr/Pfad/hier/", recursive=True, max_length=200)
    description = models.TextField("Beschreibung", blank=True)

    class Meta:
        verbose_name = "AI-Modell"
        verbose_name_plural = "AI-Modelle"

    def __str__(self):
        return self.name