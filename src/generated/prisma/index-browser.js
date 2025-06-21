
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.6.0
 * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
 */
Prisma.prismaVersion = {
  client: "6.6.0",
  engine: "f676762280b54cd07c770017ed3711ddde35f37a"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  phone: 'phone',
  birthday: 'birthday',
  address: 'address',
  class: 'class',
  grade: 'grade',
  holyname: 'holyname',
  fathername: 'fathername',
  mothername: 'mothername',
  baptismplace: 'baptismplace',
  baptismdate: 'baptismdate',
  role: 'role',
  role_id: 'role_id',
  title: 'title',
  isActive: 'isActive',
  lastlogin: 'lastlogin',
  created_at: 'created_at',
  updated_at: 'updated_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.AccountScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  email: 'email',
  passwordHash: 'passwordHash',
  status: 'status',
  lastLogin: 'lastLogin',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.ScoreScalarFieldEnum = {
  score_id: 'score_id',
  user_id: 'user_id',
  subject_id: 'subject_id',
  semester_id: 'semester_id',
  score_type_id: 'score_type_id',
  score: 'score',
  note: 'note',
  created_at: 'created_at'
};

exports.Prisma.ScoreTypeScalarFieldEnum = {
  score_type_id: 'score_type_id',
  type: 'type',
  weight: 'weight'
};

exports.Prisma.SubjectScalarFieldEnum = {
  subject_id: 'subject_id',
  subjectname: 'subjectname',
  code: 'code',
  description: 'description'
};

exports.Prisma.ClassScalarFieldEnum = {
  class_id: 'class_id',
  classname: 'classname',
  grade_id: 'grade_id',
  created_at: 'created_at',
  created_by: 'created_by',
  updated_at: 'updated_at',
  updated_by: 'updated_by',
  isactive: 'isactive'
};

exports.Prisma.ClassSubjectScalarFieldEnum = {
  class_subject_id: 'class_subject_id',
  class_id: 'class_id',
  subject_id: 'subject_id',
  teacher_id: 'teacher_id'
};

exports.Prisma.ClassuserScalarFieldEnum = {
  class_user_id: 'class_user_id',
  class_id: 'class_id',
  user_id: 'user_id'
};

exports.Prisma.AttendanceScalarFieldEnum = {
  attendance_id: 'attendance_id',
  user_id: 'user_id',
  class_subject_id: 'class_subject_id',
  attendancedate: 'attendancedate',
  status: 'status',
  note: 'note',
  created_at: 'created_at'
};

exports.Prisma.SemesterScalarFieldEnum = {
  semesterid: 'semesterid',
  semestername: 'semestername',
  year: 'year',
  yearid: 'yearid',
  note: 'note',
  created_at: 'created_at'
};

exports.Prisma.SchoolYearScalarFieldEnum = {
  schoolyearid: 'schoolyearid',
  yearname: 'yearname',
  startdate: 'startdate',
  enddate: 'enddate'
};

exports.Prisma.TranscriptScalarFieldEnum = {
  transcript_id: 'transcript_id',
  user_id: 'user_id',
  semester_id: 'semester_id',
  gpa: 'gpa',
  conduct: 'conduct',
  attendance_score: 'attendance_score',
  discipline_score: 'discipline_score',
  created_at: 'created_at'
};

exports.Prisma.DisciplineScalarFieldEnum = {
  discipline_id: 'discipline_id',
  user_id: 'user_id',
  severity_id: 'severity_id',
  class_subject_id: 'class_subject_id',
  date: 'date',
  note: 'note',
  created_at: 'created_at'
};

exports.Prisma.DisciplineSeverityScalarFieldEnum = {
  severity_id: 'severity_id',
  name: 'name',
  point_deduction: 'point_deduction',
  description: 'description',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.RoleScalarFieldEnum = {
  roleid: 'roleid',
  rolename: 'rolename',
  roledescription: 'roledescription',
  isactive: 'isactive',
  created_at: 'created_at',
  updated_at: 'updated_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.UserRoleScalarFieldEnum = {
  userroleid: 'userroleid',
  userid: 'userid',
  roleid: 'roleid'
};

exports.Prisma.GradeScalarFieldEnum = {
  grade_id: 'grade_id',
  gradename: 'gradename',
  gradedescription: 'gradedescription',
  isactive: 'isactive',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.AccountStatus = exports.$Enums.AccountStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  PENDING: 'PENDING'
};

exports.TypeOfScore = exports.$Enums.TypeOfScore = {
  oral: 'oral',
  fifteenmintest: 'fifteenmintest',
  minitest: 'minitest',
  final: 'final'
};

exports.AttendanceStatus = exports.$Enums.AttendanceStatus = {
  present: 'present',
  absent: 'absent',
  late: 'late',
  leave: 'leave'
};

exports.Conduct = exports.$Enums.Conduct = {
  Excellent: 'Excellent',
  Good: 'Good',
  Average: 'Average',
  Poor: 'Poor',
  Bad: 'Bad'
};

exports.Prisma.ModelName = {
  User: 'User',
  Account: 'Account',
  Score: 'Score',
  ScoreType: 'ScoreType',
  Subject: 'Subject',
  Class: 'Class',
  ClassSubject: 'ClassSubject',
  Classuser: 'Classuser',
  Attendance: 'Attendance',
  Semester: 'Semester',
  SchoolYear: 'SchoolYear',
  Transcript: 'Transcript',
  Discipline: 'Discipline',
  DisciplineSeverity: 'DisciplineSeverity',
  Role: 'Role',
  UserRole: 'UserRole',
  Grade: 'Grade'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }

        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
