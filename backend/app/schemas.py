from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, List
from datetime import date
from pydantic import ConfigDict

class Document(BaseModel):
    name: str
    data: str  # base64 encoded
    type: str  # MIME type

class StudentBase(BaseModel):
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    enrollmentYear: int = Field(..., ge=1900, le=2100)
    dob: Optional[str] = None
    major: Optional[str] = Field(None, max_length=100)
    class_: str = Field(..., alias="class", max_length=10)  # Using class_ to avoid Python keyword
    year: str = Field(..., max_length=50)
    photo: Optional[str] = None
    documents: Optional[List[Document]] = None

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )

class StudentCreate(BaseModel):
    firstName: str = Field(..., min_length=1, max_length=100)
    lastName: str = Field(..., min_length=1, max_length=100)
    email: EmailStr
    enrollmentYear: int = Field(..., ge=1900, le=2100)
    dob: Optional[str] = None
    major: Optional[str] = Field(None, max_length=100)
    class_: str = Field(..., alias="class", max_length=10)  # Using class_ to avoid Python keyword
    year: str = Field(..., max_length=50)
    photo: Optional[str] = None
    documents: Optional[List[Document]] = None

    @field_validator('dob', mode='before')
    @classmethod
    def parse_dob(cls, v):
        if v is None or v == '':
            return None
        return v

class StudentUpdate(BaseModel):
    firstName: Optional[str] = Field(None, min_length=1, max_length=100)
    lastName: Optional[str] = Field(None, min_length=1, max_length=100)
    email: Optional[EmailStr] = None
    enrollmentYear: Optional[int] = Field(None, ge=1900, le=2100)
    dob: Optional[str] = None
    major: Optional[str] = Field(None, max_length=100)
    class_: Optional[str] = Field(None, alias="class", max_length=10)  # Using class_ to avoid Python keyword
    year: Optional[str] = Field(None, max_length=50)
    photo: Optional[str] = None
    documents: Optional[List[Document]] = None

    @field_validator('dob', mode='before')
    @classmethod
    def parse_dob(cls, v):
        if v is None or v == '':
            return None
        return v

class StudentResponse(BaseModel):
    id: int
    firstName: str
    lastName: str
    email: EmailStr
    enrollmentYear: int
    dob: Optional[str] = None
    major: Optional[str] = None
    class_: str = Field(..., alias="class")  # Using class_ to avoid Python keyword
    year: str
    photo: Optional[str] = None
    documents: Optional[List[Document]] = None

    model_config = ConfigDict(
        populate_by_name=True,
        from_attributes=True
    )
