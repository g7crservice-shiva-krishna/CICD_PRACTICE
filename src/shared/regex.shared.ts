class CommonRegExp {
	public static readonly NAME_REGEXP = /^[A-Za-z]+[A-Za-z\s]{0,202}$/;
	public static readonly EMAIL_REGEXP = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	public static readonly PHONE_REGEXP = /^[1-9][0-9]{5,11}$/;
	public static readonly CODE_MOBILE_REGEXP = /^\+[1-9][1-9]{1,4}-[1-9][0-9]{5,11}$/;
	public static readonly COUNTRY_CODE_REGEX = /^\+[1-9][0-9]{0,3}$/;
	public static readonly DATE_REGEXP = /^\d{4}[-](0?[1-9]|1[0-2])[-](0?[1-9]|[1-2][0-9]|3[01])$/;
	public static readonly DATE_TIME_UTC_REGEXP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
	public static readonly MONTH_YEAR_REGEXP = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
	public static readonly URL_REGEXP = /^(http:\/\/|https:\/\/|www\.).+/;
	public static readonly DOMAIN_URL = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
	public static readonly STRING_WITHOUT_SPECIAL_CHAR = /^[a-zA-Z ]+$/;
	public static readonly COUNTRY_CODE = /^\+\d{1,4}$/;
	public static readonly UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
	public static readonly G7CR_EMAIL_REGEX = /^[a-zA-Z0-9._-]+@(g7cr\.com|g7cr\.in)$/;
	public static readonly MONTH_REGEX = /^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{4}$/;
	public static readonly AMOUNT_REGEX = /^(0?\.[1-9]\d?|0?\.\d{2}|[1-9]\d{0,15}|[1-9]\d{0,14}\.\d{1,2})$/;
	public static readonly ALFA_NUMERIC_REGEX = /^[a-zA-Z0-9]*$/;
	public static readonly ALFA_NUMERIC_WITH_SLASH_REGEX = /^[a-zA-Z0-9/-]*$/;
	public static readonly VALIDATE_NON_PRINTABLE_CHARACTER = /[^\x20-\x7E]+/g;
	public static readonly ALFA_NUMERIC_WITH_SOME_SPECIAL_REGEX = /^[a-zA-Z0-9\s@@.,_\\-]+$/;
	public static readonly CUSTOMER_DOMAIN_REGEX = /^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/;
	public static readonly year_month_regex = /^\d{4}-(0[1-9]|1[0-2])$/;
	public static readonly year_month_day_regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
	public static readonly description_regex = /^[^<>\\?'"+\\(\\)\\{\\}\\[\]\-\\*/&|^<>=!#;:;\0`-]+$/;
	public static readonly noSpaceStart = /^[\w@]+/;
	public static readonly DATE_TIME_OFFSET_REGEXP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?[+-]\d{2}:\d{2}$/;
	public static readonly PASSWORD_REGEX = /(?=^.{8,16}$)(?=.*\d)(?=.*[!@#$%^&*?]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
	public static readonly TIME_FORMAT_REGEX = /^([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d):(\d{3})$/;
	public static readonly PROJ_NAME = /^[a-zA-Z0-9 ]+$/;
}

export { CommonRegExp };
